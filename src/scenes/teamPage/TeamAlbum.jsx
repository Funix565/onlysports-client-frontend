import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setMembers } from "state";
import { useEffect, useState } from "react";
import { Roles } from "state/enums";

const TeamAlbum = () => {
    const {teamId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const role = useSelector((state) => state.role);

    // My own approach.
    // Since User doesn't have `members` field we can't extract it from state: state.user.members
    // So, use component state in this case with initial empty array.
    const [membersState, setMembersState] = useState([]);

    // Load team members from DB and set component state.
    const getMembers = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/trainers/${teamId}/members`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        const data = await response.json();
        setMembersState(data);
    };

    useEffect(() => {
        getMembers();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const patchMember = async (memberId) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/trainers/${teamId}/members/${memberId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });

        const data = await response.json();

        // Only Trainer can patchMember
        // Update component state
        setMembersState(data);

        // And also execute `dispatch`. This way trainer global state updates and
        // dependent components (which call `useSelector`) get notified.
        dispatch(setMembers({ members: data }));
    };

    // Album tutorial: https://github.com/mui/material-ui/blob/v5.13.2/docs/data/material/getting-started/templates/album/Album.js
    return (
        <main>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    {membersState.map((member) => (
                        <Grid item key={member._id} xs={12} sm={6} md={4}>
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        pt: '56.25%'
                                    }}
                                    image={member.picturePath}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {member.fullName}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        onClick={() => {
                                            navigate(`/profile/${member._id}`);
                                            navigate(0);
                                        }}
                                        size="small"
                                    >
                                        View
                                    </Button>
                                    { role === Roles.Trainer &&
                                        <Button
                                            onClick={() => patchMember(member._id)}
                                            size="small"
                                        >
                                            Remove
                                        </Button> }
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </main>
    );
};

export default TeamAlbum;
