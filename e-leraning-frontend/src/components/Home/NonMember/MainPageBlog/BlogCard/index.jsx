import "./style.scss";

const BlogCard = () => {
  return (
    <div className="card-container">
      <div className="card-image-section"> </div>
      <p className="blog-card-category"> category</p>
      <div className="blog-card-textarea">
        <h2>blog title heading goes there</h2>
        <p> dummy data for the tet for the cartd oftyhe </p>
      </div>
      <div className="profile-area">
        {/*  this space is for adding the prfile picture in the card */}
        <div className="profile-image">
          {/* <Image src = {} alt='profile picx' /> */}
        </div>
        <div>
          <p className=""> lorium ipsem</p>
          <p> 20-04-2002 </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
