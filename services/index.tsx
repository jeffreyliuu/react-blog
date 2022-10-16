import { gql, GraphQLClient } from 'graphql-request';

const graphQLClient = new GraphQLClient("https://api-ca-central-1.hygraph.com/v2/cl6tnmkjf1pyn01ujanfb3vhi/master");

export const getPosts = async () => {
  const query = gql`
      query MyQuery {
        postsConnection {
          edges {
            cursor
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `;

  const result = await graphQLClient.request(query);
  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `;

  const result = await graphQLClient.request(query);
  return result.posts;
}

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: { slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `
  const result = await graphQLClient.request(query, { categories, slug });
  return result.posts;
}

export const getCategories = async () => {
  const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `
  const result = await graphQLClient.request(query);
  return result.categories;
}

export const getPostDetails = async (slug) => {
  const query = gql`
      query GetPostDetails($slug : String!) {
        post(where: {slug: $slug}) {
          title
          excerpt
          featuredImage {
            url
          }
          author{
            name
            bio
            photo {
              url
            }
          }
          createdAt
          slug
          content {
            raw
          }
          categories {
            name
            slug
          }
          content {
            raw
          }
        }
      }
    `;

  const result = await graphQLClient.request(query, { slug });
  return result.post;
};

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}){
        name
        createdAt
        comment
      }
    }
  `;

  const result = await graphQLClient.request(query, { slug });

  return result.comments;
};