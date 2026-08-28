import type Lenis from "lenis";

export const lenisController: { instance: Lenis | null; navbarHeight: number } = {
  instance: null,
  navbarHeight: 64,
};

export function scrollToSection(id: string) {
  const el = document.getElementById(`section-${id}`);
  if (!el) return;

  const target = Math.max(
    0,
    el.getBoundingClientRect().top + window.scrollY - lenisController.navbarHeight,
  );

  const lenis = lenisController.instance;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3) });
  } else {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}
