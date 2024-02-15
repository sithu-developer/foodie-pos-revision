import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material"
import Image from "next/image";
import Link from "next/link"

interface Props {
    href : string;
    imgUrl : string | null;
    name : string;
    price : number | null ;
}

const MenuCard = ({href , imgUrl , name , price } : Props) => {
    return (
    <Link href={href} style={{ textDecoration : "none"}} >
    <Card sx={{  width : "200px", height : "200px" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={imgUrl ? `https://${imgUrl}` : "/default-menu.png" }
            alt={name}
            sx={{objectFit : "contain"}}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <Typography variant="body2">
              $ {price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Link>
    )
}

export default MenuCard;