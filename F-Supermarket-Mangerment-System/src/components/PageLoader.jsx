export default function PageLoader() {
  return (
    <>
      <style>
        {`
          .loader-container{
            position:fixed;
            inset:0;
            background:black;
            overflow:hidden;
            z-index:9999;
          }

          .center{
            position:absolute;
            top:50%;
            left:50%;
            margin-top:-50px;
            margin-left:-50px;
          }

          .loop{
            width:100px;
            height:100px;
            border:#bb5f27 solid 4px;
            border-radius:50%;
          }

          .loop::before{
            content:"";
            width:300px;
            height:4px;
            display:block;
            background:linear-gradient(
              to left,
              transparent 0%,
              #bb5f27 30%,
              #bb5f27 70%,
              transparent 100%
            );
            position:absolute;
            left:-100px;
            top:100px;
          }

          .bike-wrapper{
            width:108px;
            height:108px;
            animation:anim 3s linear infinite;
            position:relative;
          }

          .bike{
            width:40px;
            height:40px;
            background-image:url(/download.png);
            background-size:40px 40px;
            background-repeat:no-repeat;
            background-position:center;
            position:absolute;
            top:50%;
            left:50%;
            margin-top:15px;
            margin-left:-20px;
            }

          .bike img{
            width:100%;
            height:100%;
            object-fit:contain;
          }

          @keyframes anim{
            0%{
              margin-left:-264px;
              opacity:0;
            }
            33.33%{
              transform:rotate(0deg);
              margin-left:-50px;
              opacity:1;
            }
            66.66%{
              transform:rotate(-360deg);
              margin-left:-50px;
              opacity:1;
            }
            100%{
              margin-left:164px;
              transform:rotate(-360deg);
              opacity:0;
            }
          }
        `}
      </style>

      <div className="loader-container">
        <div className="loop center"></div>

        <div className="bike-wrapper center">
            <div className="bike"></div>
        </div>

        <h2
          style={{
            color: "white",
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Loading...
        </h2>
      </div>
    </>
  );
}

