// lib/gridfs.ts
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import { Readable } from 'stream';

let bucket: GridFSBucket;

export const initGridFS = () => {
    if (!mongoose.connection.db) {
        throw new Error('Database connection not established');
    }

    bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'resources'
    });

    return bucket;
};

export const uploadToGridFS = async (file: Buffer, filename: string, contentType: string) => {
    if (!bucket) initGridFS();

    return new Promise((resolve, reject) => {
        const readableStream = Readable.from(file);
        const uploadStream = bucket.openUploadStream(filename, {
            contentType,
            metadata: {
                uploadDate: new Date()
            }
        });

        readableStream
            .pipe(uploadStream)
            .on('error', (error) => reject(error))
            .on('finish', () => resolve(uploadStream.id));
    });
};

export const deleteFromGridFS = async (fileId: string) => {
    if (!bucket) initGridFS();

    try {
        await bucket.delete(new mongoose.Types.ObjectId(fileId));
        return true;
    } catch (error) {
        console.error('Error deleting file from GridFS:', error);
        return false;
    }
};

export const getFileStream = async (fileId: string) => {
    if (!bucket) initGridFS();
    return bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
};