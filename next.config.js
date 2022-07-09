/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   images: {
      domains: [
         'tse3.mm.bing.net',
         'tse2.mm.bing.net',
         'tse1.mm.bing.net',
         'tse4.mm.bing.net',
         'tse4.explicit.bing.net',
         'tse2.explicit.bing.net',
         'tse1.explicit.bing.net',
         'tse3.explicit.bing.net',
         'avatars.githubusercontent.com',
         'lh3.googleusercontent.com',
         'firebasestorage.googleapis.com',
      ],
   },
};

module.exports = nextConfig;
