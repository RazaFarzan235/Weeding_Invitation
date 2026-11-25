/** Single source of truth for every piece of invitation content. */

const mapLink = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

export const wedding = {
  groom: {
    name: 'Shadman',
    fullName: 'Shadman Raza',
    parentage: 'S/O Tanveer Raza',
    initial: 'S',
  },
  bride: {
    name: 'Bushra ',
    fullName: 'Bushra Siddiqua',
    parentage: 'D/O Shabir Ahmad',
    initial: 'B',
  },
  city: 'Mumbai',
  dateRange: '20 – 21 March 2027',
  hashtag: '#ShadmanWedsBushra',
  countdownTo: '2027-03-20T12:00:00+05:30',

  verse: {
    arabic:
      'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    english:
      'And of His signs is that He created for you, from yourselves, mates that you may find tranquillity in them; and He placed between you affection and mercy.',
    reference: 'Surah Ar-Rum · 30:21',
  },

  events: [
    {
      id: 'haldi',
      icon: 'bowl',
      title: 'Haldi',
      tagline: 'An evening of colour, laughter & heartfelt duas',
      date: '2027-03-19',
      time: 'Time to be announced',
      venue: 'At our residence',
      address: 'Vill - Raipur, Post office- Gohi, Police Station - Warisnagar, District - Samstipur , Bihar - 848301',
      map: mapLink('Jama masjid, Vill - Raipur, Post office- Gohi, Police Station - Warisnagar, District - Samstipur , Bihar - 848301'),
    },
    {
      id: 'nikah',
      icon: 'mosque',
      title: 'Nikah',
      tagline: 'The sacred union, sealed with the blessings of Allah',
      date: '2027-03-20',
      time: 'Time to be announced',
      venue: '---------',
      address:
        'Vill - Raipur, Post office- Gohi, Police Station - Warisnagar, District - Samstipur , Bihar - 848301',
      map: mapLink('Jama masjid, Vill - Raipur, Post office- Gohi, Police Station - Warisnagar, District - Samstipur , Bihar - 848301'),
      featured: true,
    },
    {
      id: 'walima',
      icon: 'dome',
      title: 'Walima',
      tagline: 'Reception dinner celebrating the blessed couple',
      date: '2027-03-21',
      time: '7:00 PM onwards',
      venue: 'At our residence',
      address: 'Vill - Raipur, Post office- Gohi, Police Station - Warisnagar, District - Samstipur , Bihar - 848301',
      map: mapLink('Vill - Raipur, Post office- Gohi, Police Station - Warisnagar, District - Samstipur , Bihar - 848301'),
    },
  ],

  gallery: [
    {
      src: '/media/invitation-wedding.jpeg',
      alt: 'Wedding invitation card for the Haldi, Nikah and Walima',
      caption: 'The Wedding Celebrations',
    },
    {
      src: '/media/invitation-reception.jpeg',
      alt: 'Reception invitation card, Wednesday 25 November 2026 at Wynd Banquet',
      caption: 'The Reception',
    },
  ],

  video: { src: '/media/wedding-video.mp4' },

  /**
   * Drop a file at public/media/background-music.mp3 to use your own track.
   * If it is missing, a soft synthesized ambient pad is played instead.
   */
  music: { src: '/media/background-music.mp3' },

  footer: {
    dua: 'دُعَاؤُكُمْ لَنَا بِالْخَيْرِ وَالْبَرَكَةِ',
    message: 'Your kind presence & prayers will make our day more special',
    families: 'The Siddique & Shaikh Families',
  },
}

export const navLinks = [
  { label: 'Couple', href: '#couple', hideOnMobile: true },
  { label: 'Events', href: '#events' },
  { label: 'Film', href: '#film' },
  { label: 'Gallery', href: '#gallery' },
]
