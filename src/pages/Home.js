/**
 * Created by LeutrimNeziri on 09/04/2019.
 */
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from 'presentations/Divider';
import Typography from 'presentations/Typography';
import React, { Fragment } from "react";

const styles = ({ typography }) => ({
  root: {},
})

/**
 * Home Page component
 */
class Home extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <Typography variant={'heading'}>
          Prime Training Program
          <Typography>Designed and structured by Agon Lohaj and Leutrim Neziri</Typography>
          <Divider />
        </Typography>
        <Typography variant={'p'}>
          Welcome to the first training program by PRIME. This web app will be the container of all the materials that you need to have in order to follow through the training. We are going to publish every material that we use during our lectures, related assignments and also resources that you will need to complete the training successfully.
        </Typography>

        <Typography variant={'p'}>
          This is an interactive web app, and we build it in such a manner that is transparent to the participant following this. We are going to show code snippets, partial or complete code samples, examples, content and resources. We this interactive web app has some tricks up its sleeves (you’ll get to experience them very soon, “INSERT EVIL LAUGH”). The design guidelines of this web app are based on our own PRIME guidelines (you will get to use them often). The project setup contains all the relevant libraries that you are going to be using, however you may add more library references if necessary, although we believe that the ones provided will suffice. By the time you are reading this on your own laptop, you have already set it up (the instructions will be given soon, see “Getting Started” session)
        </Typography>

        <Typography variant={'p'}>
          The lectures will be taught by Agon Lohaj (Agon, wherever you are, wave to the class!) and assisted by Leutrim Neziri. The lectures will take place at the offices at Prime in Pristina, address: YOU PROBABLY KNOW THIS ALREADY, DON’T HAVE TO SPELL IT OUT (it seemed like I was yelling this out, didn’t it?).
        </Typography>

        <Typography variant={'title'}>
          Msc. Agon Lohaj
        </Typography>
        <Typography variant={'p'}>
          A master graduate from the Technical University of Munich. Software Engineering Major, Computer Graphics and Vision Minor, Algorithms Minor. Lead Software Engineer @PRIME. Tech enthusiast and a Drummer.
        </Typography>
        <Typography variant={'title'}>
          Leutrim Neziri
        </Typography>
        <Typography variant={'p'}>
          A Technology passionate with design and front end development skills! Working at PRIME as an awesome front end engineer! The guy who implemented most of the interactive web app structure and setup!
        </Typography>

        <Typography variant={'p'}>
          The PRIME training program is organised into 26 hours of lectures split into 2 hours per day, 2 times a week. The schedule of the training program is as follows:
          <ol>
            <li>Monday 6pm until 8pm</li>
            <li>Friday 5:30pm until 7:30pm</li>
          </ol>
        </Typography>
        <Typography variant={'p'}>
          A person who completes the training successfully will be able to understand the following concepts:
          <ol>
            <li>Working with git, git tools, using GitLab as a repository with Sourcetree</li>
            <li>Working with CD/CI</li>
            <li>Working with Webpack</li>
            <li>Working with React JS and Redux</li>
            <li>Consuming API services using RESTful API-s</li>
            <li>Unit Testing</li>
            <li>Agile Methodology</li>
          </ol>
        </Typography>
        <Typography variant={'p'}>
          Requirements:
          <ol>
            <li>Bachelor’s degree in computer science or related studies (BONUS)</li>
            <li>Basic coding skills</li>
            <li>A laptop</li>
            <li>English (BONUS)</li>
            <li>Motivation and Dedication</li>
          </ol>
        </Typography>
        <Typography variant={'p'}>
          Fun activities included:
          <ol>
            <li>Hangout and Drinks</li>
            <li>Fun and entertainment (ping pong, xbox, guitar hero)</li>
            <li>Meetups</li>
          </ol>
        </Typography>
        <Typography variant={'p'}>
          Due to the fact that this is the first training program organised by PRIME, we generally ask for feedback as to how the training is going. Your suggestions, comments or feedback will be much appreciated. Furthermore, these feedback will help improve the program so that other participants in the future will have a better learning experience.
        </Typography>
        <Typography variant={'p'}>
          Additionally, the idea is to make this program an open source training, that will be used and improved by other companies (we do have lots of friends in the community of the tech companies in Kosovo, closely related and/or relatives of the PRIME staff, or family, we prefer the second).
        </Typography>
        <Typography variant={'title'}>
          Contact:
        </Typography>
        <Typography variant={'p'}>
            Agon Lohaj: agonlohaj@goprime.io
        </Typography>
        <Typography variant={'p'}>
            Leutrim Neziri: leutrimneziri@goprime.io
        </Typography>
      </Fragment>
    )
  }
}

export default withStyles(styles)(Home)
