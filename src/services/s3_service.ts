import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";

class S3Service {
  private s3: S3Client;

  private bucket: string;

  constructor() {
    this.bucket = process.env.S3_BUCKET!;
    this.s3 = new S3Client({
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
    });
  }

  async uploadFileToBucket(file: File): Promise<string | null> {
    try {
      const objectKey = `${file.type}/${Date.now()}.${file.name}`;
      const params: PutObjectCommandInput = {
        Bucket: this.bucket,
        Key: objectKey,
        Body: file,
        ContentType: file.type,
        ContentDisposition: "inline",
      };
      const command = new PutObjectCommand(params);
      await this.s3.send(command);
      const objectUrl = `https://${this.bucket}.s3.amazonaws.com/${objectKey}`;
      return objectUrl;
    } catch (error) {
      return null;
    }
  }
}

const s3Service = new S3Service();
export default s3Service;
