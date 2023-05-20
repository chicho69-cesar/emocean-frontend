import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '@env'
import { S3 } from 'aws-sdk'

const s3 = new S3({
  region: 'us-east-2',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
})

export const uploadImage = async (uri, type, name) => {
  const response = await fetch(uri)
  const blob = await response.blob()
  const fileNameInBucket = `images/${Date.now().toString()}-${name}`

  const options = {
    Bucket: 'dio-planner',
    Key: fileNameInBucket,
    ContentType: type,
    Body: blob
  }

  s3.putObject(options, (error, data) => {
    if (error) {
      console.error(error)
    } else {
      console.log('Image uploaded successfully:', data)
    }
  })

  return `https://dio-planner.s3.us-east-2.amazonaws.com/${fileNameInBucket}`
}
