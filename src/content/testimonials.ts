export type Testimonial = {
  quote: string;
};

export const testimonials = {
  pl: [
    {
      quote: 'Masz to coś! Bardzo wartościowa sesja. Pokazałaś mi zupełnie inną perspektywę.',
    },
    {
      quote: 'Ale mi nasza rozmowa ustawiła dzień. Mega dziękuję za dobrą energię <3.',
    },
    {
      quote: 'Ty to masz do tego talent.',
    },
    {
      quote: 'Masz ładny, radiowy głos. Bardzo ładnie mówisz.',
    },
    {
      quote: 'Masz ciepły, spokojny głos. Twój spokój mi się udzielił, czułam duże bezpieczeństwo w rozmowie, spójność i stabilność. Twoje pytania były spójne i wyważone i miałam poczucie, że dokądś mnie prowadzą.',
    },
  ],
  en: [
    {
      quote: 'You have something special. It was a very valuable session — you showed me a completely different perspective.',
    },
    {
      quote: 'Our conversation really set the tone for my day. Thank you so much for the good energy <3.',
    },
    {
      quote: 'You really have a talent for this.',
    },
    {
      quote: 'You have a lovely, radio-quality voice. You speak beautifully.',
    },
    {
      quote: 'You have a warm, calm voice. Your calmness rubbed off on me, and I felt very safe in the conversation — there was a real sense of steadiness and consistency. Your questions were thoughtful and well-balanced, and I felt they were leading me somewhere.',
    },
  ],
} as const;
