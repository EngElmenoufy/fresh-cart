import { OwlOptions } from 'ngx-owl-carousel-o';

export const sliderOptions = (isResponsive: boolean = false): OwlOptions => {
  let options: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplaySpeed: 700,
    navSpeed: 700,
    navText: ['Prev', 'Next'],
    autoplay: true,
    autoplayHoverPause: true,
    center: true,
    items: 1,
    nav: false,
  };

  if (isResponsive) {
    options.responsive = {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    };
    options.dots = false;
    options.nav = true;
  }

  return options;
};
