import Image from "next/image";
// import img from 'https://youimg1.tripcdn.com/target/100e0h0000008rp39A12F.jpg'

const Index = () => {
  return (
    <div>
      <p>Image-View</p>
      <hr />
      <Image
        alt="img"
        width={380}
        height={240}
        src={"https://youimg1.tripcdn.com/target/100e0h0000008rp39A12F.jpg"}
        layout="intrinsic"
        // placeholder="blur"
        // blurDataURL="1"
      />
    </div>
  );
};

export default Index;
