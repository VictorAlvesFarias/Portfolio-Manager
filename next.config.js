/** 
 *@type {import('next').NextConfig} 
*/
const nextConfig ={  
images: {
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
      ],
}
}

module.exports = nextConfig