import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import Layout from "../../components/Layout";
import styled from "styled-components";

const H2 = styled.h2`
 margin: 0;
`;

const BlogDiv = styled.div`
 background-color: rgba(0, 0, 0,0.3);
 padding: 20px;
 box-sizing: border-box;
`;

const BlogWrapper = styled.div`
 margin-top: 10px;
 display: grid;
 gap: 10px;
`;

export default ({posts}) => (
 <Layout title="Blog">
     Burada yazılar yer alacak
    <BlogWrapper>
       {posts.map((post) => {
        const {slug , frontmatter} = post;


        const {title , author , category , date , bannerImage , tags} = frontmatter;

        return (
          <article key={title}>
            <Link href={`/blog/${slug}`} >
                <h1>{title}</h1>
            </Link>

            <h3>{author}</h3>
            <h3>{date}</h3>
          </article>
        );


       }
       )} 
    </BlogWrapper>
 </Layout>
);


export async function getStaticProps() {
    const files = fs.readdirSync("posts");

    const posts = files.map((filename) => {
        const slug = filename.replace(".md" ,"");
        const readfile = fs.readFileSync(`posts/${filename}` , "utf8");
        const { data:frontmatter} = matter(readfile); 

        return {
            slug,
            frontmatter,
        };
    });

    return {
        props:{

            posts,
        },
    };
}

