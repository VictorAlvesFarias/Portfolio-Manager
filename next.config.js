/** 
 *@type {import('next').NextConfig} 
*/
const nextConfig ={  
    experimental: {
        esmExternals: "loose", // <-- add this
        serverComponentsExternalPackages: ["mongoose"] // <-- and this
    },
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '**',
            },        
            {
                protocol: 'https',
                hostname: 'drive.google.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.google.com',
                pathname: '**'
            }
        ],
}
}

module.exports = nextConfig