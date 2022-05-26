import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Section from "../components/Section";
import Seo from "../components/Seo";

// markup
const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      mdx(slug: { eq: "" }) {
        frontmatter {
          sections {
            moreLink
            moreLinkTitle
            moreTitle
            sectionSubtitle
            sectionTitle
            items {
              itemLink
              itemSubtitle
              itemTags
              itemTitle
              itemImage {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  `);

  return (
    <>
      <Seo title="Herosimo: Welcome to my site!" />
      <Layout>
        <Banner />
        {data.mdx.frontmatter.sections.map((section, i) => {
          return <Section key={i} data={section} />;
        })}
      </Layout>
    </>
  );
};

export default IndexPage;
