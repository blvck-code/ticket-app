// Static Site Generation (SSG) -> pre-render at build time for fast, static pages

export async function getStaticProps() {
    const data = await fetch('https://api.example.com/posts').
    then(res => res.json());
    return { props: { posts: data} };
}

export default function Blog({ posts }) {
    return (
        <div>
            {
                posts.map(post => (
                    <h2 key={post.id}>{post.title}</h2>
                ))
            }
        </div>
    )
}

// Server Side Rendering (SSR) -> real-time content generation on every request

export async function getServerSideProps() {
    const data = await fetch('https://api.example.com/posts').
        then(res => res.json());
    return { props: { user: data } };
}

export default function UserProfile({ user }) {
    return <h1>Welcome, { user.name }!</h1>
}


// Client Side Rendering (CSR) -> fetch data on client side for interactivity

import { useEffect, useState } from 'react';
 export default function Products() {
     const [products, setProducts] = useState([]);

     useEffect(() => {
         fetch('https://api.example.com/posts?limit=1&offset=0')
         .then(res => res.json())
         .then(data => setProducts(data));
     }, []);

     return (
         <div>
             {
                 products.map(product => (
                     <h2 key={product.id}>{product.title}</h2>
                 ))
             }
         </div>
     )
 }


 // Incremental Static Regeneration (ISR) -> incremental updates to static content post-build

 export async function getStaticProps() {
     const data = await fetch('https://api.example.com/posts').
         then(res => res.json());
     return {
         props: {
             news: data
         },
         revalidate: 10 // Update every 10 seconds
     }
 }

 export default function News({ news }) {
     return (
         <div>
             { news.map(new => (
                 <h2 key={new.id}>{new.title}</h2>
                 ))}
         </div>
     )
 }


// Hybrid Rendering -> combine SSG, SSR and CSR for flexibility

export async function getStaticProps() {
     const staticData = await fetch('https://api.example.com/posts?limit=1&offset=0')
    .then(res => res.json());
     return {
         props: { staticData }
     }
}

export default function Home({ staticData}) {
     const [dynamicData, setDynamicData ] = useState(null);

     useEffect(() => {
         fetch('https://api.example.com/posts?limit=1&offset=0')
         .then(res => res.json())
         .then(data => setDynamicData(data));
     })

    return (
        <div>
            <h1>Static Data: { staticData.title }</h1>
            { dynamicData && <h2>Dynamic Data: { dynamicData.info }</h2>}
        </div>
    )


}

