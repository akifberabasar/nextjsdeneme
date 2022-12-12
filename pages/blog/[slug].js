import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import Layout from "../../components/Layout";


export default ({ frontmatter , content}) => {
    const { title , author , category , date} = frontmatter;

    return (
        <Layout title={title}>
            <h2>
                 {author} || {date}
            </h2>

            <h3>
                {category} || {date}
            </h3>

            <div dangerouslySetInnerHTML={{__html: md().render(content) }} />
        </Layout>
    );
};

export async function getStaticPaths() {
    const files = fs.readdirSync("posts");
    const paths = files.map((filename) => ({
        params: {
            slug:filename.replace(".md" ,"" )
        },
    }));

    return {
        paths,
        fallback: false,
    };

}

export async function getStaticProps({params: {slug}}) {
    const filename = fs.readFileSync(`posts/${slug}.md`, "utf-8");
    const { data: frontmatter , content } = matter(filename);
    
    return {
        props : {
            frontmatter,
            content,
        },
    };
}