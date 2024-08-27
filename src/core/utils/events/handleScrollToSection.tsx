export const handleScrollToSection =
	(sectionId: string): React.MouseEventHandler<HTMLElement> =>
	(e) => {
		e.preventDefault();

		const section = document.querySelector(sectionId) as HTMLDivElement;

		if (!section) return;

		const sectionTopOffset = section.getBoundingClientRect().top;

		const SCROLL_THRESHOLD = 300;
		const HEADER_HEIGHT_OFFSET = 96;

		const isBelowScrollThreshold = section.offsetTop < SCROLL_THRESHOLD;

		const scrollOffset = HEADER_HEIGHT_OFFSET;

		const targetPosition = sectionTopOffset + window.pageYOffset - scrollOffset;

		const scrollTop = isBelowScrollThreshold ? 0 : targetPosition;

		window.scrollTo({
			top: scrollTop,
			behavior: 'smooth',
		});
	};
