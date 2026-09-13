type Rect = { left: number; right: number; top: number; bottom: number };

export function placeIcon(anchor: Rect, text: Rect[], viewport: { width: number; height: number }) {
  const size = 15;
  const left = (anchor.left + anchor.right - size) / 2;
  for (const top of [anchor.top - size - 6, anchor.bottom + 6]) {
    const box = { left: left - 2, right: left + size + 2, top: top - 2, bottom: top + size + 2 };
    if (box.left < 8 || box.right > viewport.width - 8 || box.top < 8 || box.bottom > viewport.height - 8) continue;
    if (text.some((rect) => box.left < rect.right && box.right > rect.left && box.top < rect.bottom && box.bottom > rect.top)) continue;
    return { left, top };
  }
  return null;
}
