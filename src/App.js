import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostEditForm from "./pages/posts/PostEditForm";
import SongCreateForm from "./pages/songs/SongCreateForm";
import SongEditForm from "./pages/songs/SongEditForm";
import PostPage from "./pages/posts/PostPage";
import SongPage from "./pages/songs/SongPage";
import WallHome from "./pages/wall/WallHome";
import ProfilePage from "./pages/profiles/ProfilePage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <WallHome message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/wall"
            render={() => (
              <WallHome
                message="No results found. Adjust the search keyword."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/miced"
            render={() => (
              <WallHome
                message="No results found. Adjust the search keyword."
                filter={`mic__owner__profile=${profile_id}&ordering=-mic__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/songs/create" render={() => <SongCreateForm />} />
          <Route exact path="/songs/:id/edit" render={() => <SongEditForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/songs/:id" render={() => <SongPage />} />
          <Route
            exact
            path="/profiles/:id"
            render={() => (
              <ProfilePage message="No results found. This profile doesn't have any posts or songs yet!" />
            )}
          />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
