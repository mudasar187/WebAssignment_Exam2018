import React from "react";
import { Grid } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <Grid>
        <div className="text-center copyright">
          &copy; {new Date().getFullYear()} QuizGame
        </div>
      </Grid>
    </footer>
  );
}

export default Footer;
