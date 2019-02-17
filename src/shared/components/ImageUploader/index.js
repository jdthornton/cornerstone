import React from 'react';

import Card from '../Card';
import Image from '../Image';
import styles from './index.css';

const ImageUploader = ({image, uploadImage, placeholder}) => {
  const handleFileUpload = ({target}) => {
    const image = target.files[0];
    uploadImage(image);
  }
  return(
    <Card>
      <Image
        image={image}
        placeholder={placeholder}
        width="100%"
        height="170px"
      />
      <div className={styles.banner}>
        <label className={styles.label}>
          Upload a Cover Image
          <input type="file" onChange={handleFileUpload} />
        </label>
        <span className={styles.muted}>Max file size is 30MB per image. JPG, PNG, or GIF formats only.</span>
      </div>
    </Card>
  );
}

export default ImageUploader;
