import React from "react";
import Layout from "../../components/Layout/Layout";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Box } from "@mui/material";
import {
  getPromotions,
  dashboardSelector,
} from "../../store/slices/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FormDialog from "../../components/FormDialog";
import { deletePromotion } from "../../services/serverService";
import { useRouter } from "next/router";
import withAuth from "../../components/withAuth";

const Promotion = () => {
  const promotion = useSelector(dashboardSelector);
  const dispatch = useDispatch();

  const router = useRouter();

  const [open, setOpen] = React.useState(open);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    dispatch(getPromotions());
  }, [dispatch]);
  return (
    <Layout>
      <Box className="w-full h-fullrelative">
        <Grid
          className="relative"
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {promotion.promotionsList.map((value) => (
            // <>1</>
            <Grid item key={value["promotionId"]} xs={12} sm={6} md={6} lg={3}>
              <Card sx={{ maxWidth: 300 }}>
                <CardActionArea>
                  <CardMedia
                    className="object-contain"
                    component="img"
                    image={value["promotionImage"]}
                    alt="promotion image"
                  />
                  <CardContent>
                    <Box className="flex flex-row justify-between items-center">
                      <Typography variant="h5" component="div">
                        {value["promotionTitle"]}
                      </Typography>
                      <Box
                        onClick={async () => {
                          if (confirm("ต้องการลบข้อมูลนี้ใช่หรือไม่ ")) {
                            await deletePromotion(value["promotionId"]);
                            router.reload();
                          } else {
                          }
                        }}
                      >
                        <DeleteIcon />
                      </Box>
                      {/* <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography> */}
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Fab
          variant="extended"
          onClick={handleClickOpen}
          className="absolute bottom-10 right-10 "
        >
          <AddIcon sx={{ mr: 1 }} />
          Add Promotions
        </Fab>

        <FormDialog
          open={open}
          onDialogOpen={() => setOpen(true)}
          onDialogClose={() => setOpen(false)}
        ></FormDialog>
      </Box>
    </Layout>
  );
};

export default Promotion;
