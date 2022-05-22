import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Section from "../components/Section";

// markup
const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      mdx(id: { eq: "6823a5d0-e498-55bb-98c9-66a5ea89aa31" }) {
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
    <Layout>
      <Banner />
      {data.mdx.frontmatter.sections.map((section, i) => {
        return <Section key={i} data={section} />;
      })}
    </Layout>
  );
};

export default IndexPage;
