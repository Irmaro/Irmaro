export type Testimonial = { quote: string };

export const testimonials = {
  pl: [
    { quote: 'Masz ciepły, spokojny głos. Twój spokój mi się udzielił, czułam duże bezpieczeństwo w rozmowie, spójność i stabilność. Twoje pytania były spójne i wyważone i miałam poczucie, że dokądś mnie prowadzą.' },
    { quote: 'Bardzo wartościowa sesja. Pokazałaś mi zupełnie inną perspektywę.' },
    { quote: 'Ale mi nasza rozmowa ustawiła dzień. Mega dziękuję za dobrą energię <3.' },
  ],
  en: [
    { quote: 'You have such a warm, calm voice. Your calmness really rubbed off on me. I felt very safe in our conversation — there was a sense of steadiness and consistency. Your questions were thoughtful and well balanced, and I felt they were gently leading me somewhere.' },
    { quote: 'A very valuable session. You helped me see things from a completely different perspective.' },
    { quote: 'Our conversation really set the tone for my whole day. Thank you so much for the positive energy <3.' },
  ],
} as const;
