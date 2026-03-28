type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

const DEFAULT_RETRY = 2;

function hasLocalStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/**
 * Lưu dữ liệu vào localStorage (tự JSON.stringify).
 * Nếu lưu lỗi sẽ tự retry vài lần (giới hạn).
 * Trả về true nếu lưu thành công.
 */
export function saveToLocalStorage(key: string, value: Json): boolean {
  if (!hasLocalStorage()) return false;

  const payload = JSON.stringify(value);

  for (let attempt = 1; attempt <= DEFAULT_RETRY; attempt++) {
    try {
      window.localStorage.setItem(key, payload);
      return true;
    } catch {
      // Attempt 2+: thử dọn key rồi set lại (tránh dữ liệu cũ gây lỗi).
      if (attempt < DEFAULT_RETRY) {
        try {
          window.localStorage.removeItem(key);
        } catch {
          // ignore
        }
      }
    }
  }

  return false;
}

/**
 * Lấy dữ liệu từ localStorage (tự JSON.parse).
 * Nếu lấy/parse lỗi sẽ tự retry vài lần (giới hạn).
 * Trả về null nếu không tồn tại / vẫn lỗi / chạy ở server.
 */
export function getFromLocalStorage<T = Json>(key: string): T | null {
  if (!hasLocalStorage()) return null;

  for (let attempt = 1; attempt <= DEFAULT_RETRY; attempt++) {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw == null) return null;
      return JSON.parse(raw) as T;
    } catch {
      // Nếu parse lỗi nhiều lần: xoá key hỏng để tránh lỗi lặp lại.
      if (attempt >= DEFAULT_RETRY) {
        try {
          window.localStorage.removeItem(key);
        } catch {
          // ignore
        }
      }
    }
  }

  return null;
}

/**
 * Xoá 1 key trong localStorage.
 * Trả về true nếu thao tác thành công.
 */
export function removeFromLocalStorage(key: string): boolean {
  if (!hasLocalStorage()) return false;
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Xoá toàn bộ localStorage.
 * Trả về true nếu thao tác thành công.
 */
export function clearLocalStorage(): boolean {
  if (!hasLocalStorage()) return false;
  try {
    window.localStorage.clear();
    return true;
  } catch {
    return false;
  }
}

