import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import CardProduct from "../../molecules/CardProduct";

import "../../assets/scss/dashboard/main.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 70,
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  paper: {
    height: 270,
    width: "90%",
    boxShadow: "none",
  },
  control: {
    // padding: theme.spacing(2),
  },
  img_course: {
    width: "100%",
    height: "70%",
    objectFit: "cover",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
}));

const ProductsList = ({ products }) => {
  const comp = products.map((item, index) => (
    <CardProduct
      item_course={item}
      type="course"
      index={index}
      key={`container_card_${index}`}
    />
  ));

  return comp;
};

function ContainerProducts({ courses, title }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>{title}</h1>
      <div className="dashboardContainer">
        <ProductsList products={courses} />
      </div>

      {/* <Grid container spacing={3} justify="flex-start" alignItems="center">
        
      </Grid> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  courses: state.courseState.courses,
});

export default connect(mapStateToProps)(ContainerProducts);
