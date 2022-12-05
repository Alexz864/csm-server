// styled components
import {
    StyledFormArea,
    StyledFormButton,
    Avatar,
    StyledTitle,
    colors,
    ButtonGroup,
    ExtraText,
    TextLink,
    CopyrightText
} from '../components/Styles';

// logo
import Logo from '../assets/logo.png';

// formik
import {Formik, Form} from 'formik';
import { TextInput } from '../components/FormLib';
import * as Yup from 'yup';

// icons
import {FiMail, FiLock} from 'react-icons/fi';

// loader
import * as Loader from 'react-loader-spinner';

// auth & redux
import { connect } from 'react-redux';
import { loginAdmin } from '../auth/actions/userActions';
import { useNavigate } from 'react-router-dom';

const Login = ({loginAdmin}) => {
    const navigate = useNavigate();

    return(
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme}  size={30}>Admin Login</StyledTitle>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("Invalid email address.")
                            .required("Required"),
                            password: Yup.string().min(8, "Password is too short.")
                            .max(20, "Password is too long.").required("Required"),
                        })
                    }
                    onSubmit={(values, {setSubmitting, setFieldError}) => {
                        console.log(values);
                        loginAdmin(values, navigate, setFieldError, setSubmitting);
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <TextInput 
                                name="email"
                                type="text"
                                label="Email Address"
                                placeholder="Enter email"
                                icon={<FiMail />}
                            />

                            <TextInput 
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="Enter password"
                                icon={<FiLock/>}
                            />

                            <ButtonGroup>
                                {!isSubmitting && (
                                    <StyledFormButton type="submit">Login</StyledFormButton>
                                )}

                                {isSubmitting && (
                                    <Loader.TailSpin
                                        color={colors.theme}
                                        height={50}
                                        width={100}
                                    />
                                )}
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>
                <ExtraText>
                    Not Admin? Go <TextLink to="/">Home</TextLink>
                </ExtraText>
            </StyledFormArea>
            <CopyrightText>All rights reserved &copy;{new Date().getFullYear()} </CopyrightText>
        </div>
    );
}

export default connect(null, {loginAdmin})(Login);