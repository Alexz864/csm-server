import {
    StyledTitle,
    Avatar,
    StyledButton,
    ButtonGroup
} from '../components/Styles';

// logo
import Logo from '../assets/logo.png';

const Home = () => {
    return(
        <div>
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "transparent",
                width: "100%",
                padding: "15px",
                display: "flex",
                justifyContent: "flex-start",
            }}>
                <Avatar image={Logo} />
            </div>
            <StyledTitle size={65}>
                Welcome to CSM-Suceava!
            </StyledTitle>

            <ButtonGroup>
                <StyledButton to="/login">Login</StyledButton>
            </ButtonGroup>
        </div>
    );
}

export default Home;