import mongoose from 'mongoose';

const newsSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        isPublished: {
            type: Boolean,
            required: true,
            default: false
        },
        comments: {
            type: [Object]
        }
    },
    {
        timestamps: true,
    }
);


const News = mongoose.model('News', newsSchema);

export default News;