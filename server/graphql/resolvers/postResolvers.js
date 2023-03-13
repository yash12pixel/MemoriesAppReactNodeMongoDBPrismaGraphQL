// import User from "../../models/user.js";
// import Post from "../../models/post.js";
import cloudinary from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// import { GraphQLUpload } from "apollo-upload-server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploader = async (path) => {
  await cloudinary.uploader.upload(path, "memories");
};

const postResolver = {
  Query: {
    async getPostsByUser(_, { id }, context) {
      // console.log("log", context);
      const user = context.user;
      // console.log("log", user);

      try {
        if (!context.loggedIn) {
          console.log("login");
          throw new Error("Please Login Again");
        } else {
          const userByPost = await prisma.user.findMany({
            where: {
              id: user.id,
            },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,

              posts: {
                select: {
                  id: true,
                  title: true,
                  message: true,
                  creator: true,
                  tags: true,
                  likeCount: true,
                },
              },
            },
          });
          // console.log("userPost::", userByPost[0]);
          return userByPost[0];
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async getPost(_, { id }, context) {
      const user = context.user;
      try {
        if (!context.loggedIn) {
          throw new Error("Please Login Again");
        } else {
          const isValidPostId = await prisma.post.findFirst({
            where: {
              id: id,
            },
          });

          if (!isValidPostId) {
            throw new Error(
              `The id: ${id} that you've entered is invalid. Please try again.`
            );
          }

          return isValidPostId;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  // Upload: GraphQLUpload,
  Mutation: {
    async createPost(_, { title, message, creator, tags }, context) {
      const user = context.user;
      // let url;
      // console.log("user::", user);
      // console.log("filess::");
      try {
        if (!context.loggedIn) {
          throw new Error("Please Login Again");
        } else if (!title || title == null || title == undefined) {
          throw new Error("Title is required");
        } else if (!message || message == null || message == undefined) {
          throw new Error("Message is required");
        } else if (!creator || creator == null || creator == undefined) {
          throw new Error("Creator is required");
        } else if (!tags || tags == null || tags == undefined) {
          throw new Error("Tags is required");
        } else {
          // if (file) {
          //   const { path } = file;
          //   const newPath = await uploader(path);
          //   url = {
          //     public_id: newPath.public_id,
          //     asset_id: newPath.asset_id,
          //     version_id: newPath.version_id,
          //     width: newPath.width,
          //     height: newPath.height,
          //     format: newPath.format,
          //     original_filename: newPath.original_filename,
          //     url: newPath.url,
          //   };
          //   // console.log("urls::", url);
          //   fs.unlinkSync(path);
          // }
          // const postMessage = await Post.create({
          //   title,
          //   message,
          //   creator,
          //   tags,
          //   // url,
          //   user: user.id,
          // });
          // const result = await postMessage.save();

          // await User.findByIdAndUpdate(
          //   { _id: user.id },
          //   { $push: { posts: postMessage._id } },
          //   { new: true }
          // );

          // console.log("result add::", result);

          const createPost = await prisma.post.create({
            data: {
              title: title,
              message: message,
              creator: creator,
              tags: tags,
              likeCount: 0,
              userId: user.id,
            },
          });

          return createPost;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async updatePost(_, { id, title, message, creator, tags }, context) {
      const user = context.user;
      try {
        if (!context.loggedIn) {
          throw new Error("Please Login Again");
        } else {
          const isPost = await await prisma.post.findFirst({
            where: {
              id: id,
            },
          });
          if (!isPost) {
            throw new Error(
              `The id: ${id} that you've entered is invalid. Please try again.`
            );
          }
          // const updatedPost = await Post.findByIdAndUpdate(
          //   { _id: id },
          //   {
          //     $set: {
          //       title: title,
          //       creator: creator,
          //       message: message,
          //       tags: tags,
          //     },
          //   },
          //   { new: true }
          // );
          // const result = updatedPost;
          const updatedPost = await prisma.post.update({
            where: {
              id: id,
            },
            data: {
              title: title,
              message: message,
              creator: creator,
              tags: tags,
            },
          });
          return updatedPost;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async deletePost(_, { id }, context) {
      const user = context.user;
      // console.log("user::", user);
      try {
        if (!context.loggedIn) {
          throw new Error("Please Login Again");
        } else {
          const isPost = await prisma.post.findFirst({
            where: {
              id: id,
            },
          });

          if (!isPost)
            throw new Error(
              `The id: ${id} that you've entered is invalid. Please try again.`
            );

          // const delres = await Post.findByIdAndDelete(id);

          // console.log("post data:::", isPost);
          // const findUser = await User.findOne({ _id: user.id });
          // console.log("findUser:::", findUser);

          // const updatePosts = findUser.posts.filter((posts) => {
          //   return posts != id;
          // });
          // console.log("updatePosts:::", updatePosts);

          // const updateUser = await User.findOneAndUpdate(
          //   { _id: user.id },
          //   { $set: { posts: updatePosts } }
          // );
          // console.log("updateUser:::", updateUser);

          // await updateUser.save();
          // // console.log("result:::", result);

          // console.log("delres:::", delres);

          const result = await prisma.post.delete({
            where: {
              id: id,
            },
          });

          // const updateUser = await prisma.user.findMany({
          //   where: {
          //     id: user.id,
          //   },
          //   include: {
          //     posts: {
          //       select: {
          //         title: true,
          //         message: true,
          //         creator: true,
          //         tags: true,
          //         likeCount: true,
          //         selectedFile: true,
          //       },
          //     },
          //   },
          // });

          return result;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async likePost(_, { id }, context) {
      try {
        if (!context.loggedIn) {
          throw new Error("Please Login Again");
        } else {
          const isPost = await prisma.post.findFirst({
            where: {
              id: id,
            },
          });

          if (!isPost) {
            throw new Error(
              `The id: ${id} that you've entered is invalid. Please try again.`
            );
          }

          const updatedPost = await prisma.post.update({
            where: {
              id: id,
            },
            data: {
              likeCount: isPost.likeCount + 1,
            },
          });
          return updatedPost;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

export default postResolver;
