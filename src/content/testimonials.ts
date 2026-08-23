export type Testimonial = {
  quote: string;
  author?: string;
  context?: string;
};

export const testimonials: Testimonial[] = [
  // Dodawaj wyłącznie opinie, na których publikację Irma ma zgodę.
  //
  // Przykład:
  // {
  //   quote: 'Treść opinii klienta...',
  //   author: 'Anna',
  //   context: 'coaching kariery',
  // },
];
