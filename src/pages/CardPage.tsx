// src/pages/CardPage.tsx

import React from 'react';
import {
    Box,
    Button,
    Container,
    CardMedia as MuiCardMedia, // Renamed to MuiCardMedia to distinguish from any potential local CardMedia
    Typography,
    Grid, // Note: The existing code uses <Grid size={4}>. If this Grid is from @mui/material, 'size' is not a standard prop. Standard props are xs, sm, md, etc.
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    IconButton,
} from '@mui/material';
import { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { DsCard, Bull } from '../components/surface/DsCard'; // DsCard 컴포넌트 경로를 확인해주세요.
import Image1 from '../assets/images/img_burger.jpg';
import Image2 from '../assets/images/img_coffee.jpg';

// --- RecipeReviewCard START ---
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMoreStyled = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function RecipeReviewCard() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <MuiCardMedia
                component="img"
                height="194"
                image={Image2} // Ensure this image exists in your public/static/images/cards/ folder
                alt="coffee"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMoreStyled
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMoreStyled>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography>Method:</Typography>
                    <Typography>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.
                    </Typography>
                    <Typography sx={{ marginBottom: 2 }}>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo in the pan. Add
                        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                        stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
// --- RecipeReviewCard END ---

const CardPage = () => {
    const handleLearnMoreClick = (cardTitle: string) => {
        alert(`"${cardTitle}" 카드에서 "Learn More" 버튼 클릭됨!`);
    };

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
                Card 컴포넌트
            </Typography>

            <Grid container spacing={4}>
                {/* 예시 1: 기본 구조화된 props 사용 (MUI 예제 기반) */}
                <Grid size={4}> {/* Assuming 'size' is a valid prop for your Grid setup */}
                    <DsCard
                        overline="Word of the Day"
                        title={
                            <>
                                be{Bull}nev{Bull}o{Bull}lent
                            </>
                        }
                        subheader="adjective"
                        content={
                            <>
                                well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                            </>
                        }
                        actionText="Learn More"
                        onActionClick={() => handleLearnMoreClick('Benevolent')}
                        sx={{ height: '100%' }}
                    />
                </Grid>

                {/* 예시 2: 다른 내용과 elevation variant 사용 */}
                <Grid size={4}>
                    <DsCard
                        variant="elevation"
                        elevation={6}
                        overline="Featured Article"
                        title="The Future of AI"
                        subheader="Technology Insights"
                        content="Exploring the advancements and ethical considerations of artificial intelligence in the modern world."
                        actionText="Read Article"
                        onActionClick={() => handleLearnMoreClick('Future of AI')}
                        sx={{ height: '100%' }}
                    />
                </Grid>

                {/* 예시 3: 최소한의 props 사용 */}
                <Grid size={4}>
                    <DsCard
                        title="Simple Card"
                        content="This is a basic card with only a title and content."
                        sx={{ height: '100%' }}
                    />
                </Grid>

                {/* 예시 4: children을 사용하여 커스텀 내부 컨텐츠 구성 */}
                <Grid size={4}>
                    <DsCard variant="outlined" sx={{ height: '100%' }}>
                        <MuiCardMedia // Using MuiCardMedia here
                            component="img"
                            height="140"
                            image={Image1} // This is your imported burger image
                            alt="Custom image for card"
                        />
                        <Box sx={{ p: 2 }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Custom Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                This card uses children for a completely custom layout,
                                including a CardMedia and custom Typography arrangement.
                                Lizards are a widespread group of squamate reptiles.
                            </Typography>
                        </Box>
                        <Box sx={{ p: 2, pt: 0 }}>
                            <Button size="small" onClick={() => handleLearnMoreClick('Custom Lizard')}>
                                Share
                            </Button>
                            <Button size="small" onClick={() => handleLearnMoreClick('Custom Lizard')}>
                                Learn More
                            </Button>
                        </Box>
                    </DsCard>
                </Grid>

                {/* 예시 5: Overline과 Action만 있는 카드 */}
                <Grid size={4}>
                    <DsCard
                        overline="Quick Tip"
                        actionText="Got it!"
                        onActionClick={() => handleLearnMoreClick('Quick Tip')}
                        sx={{ height: '100%' }}
                    >
                        <Box sx={{ p: 2}}>
                            <Typography variant="h6" component="div" sx={{mb: 1}}>
                                Remember This!
                            </Typography>
                            <Typography variant="body2">
                                This card demonstrates using only overline and an action.
                                The main content area can be filled using the `content` prop or by customizing the `DsCard` to better handle mixed modes.
                                For now, if `overline` or `actionText` is used, `children` are ignored by `DsCard`.
                            </Typography>
                        </Box>
                    </DsCard>
                </Grid>

                {/* 예시 6: DsCard의 content prop을 사용하여 예시 5를 개선 */}
                <Grid size={4}>
                    <DsCard
                        overline="Quick Tip (Improved)"
                        title="Remember This!"
                        content={
                            <Typography variant="body2">
                                This card demonstrates using `overline`, `title`, `content`, and an `actionText`.
                                This is the intended way when using structured props.
                            </Typography>
                        }
                        actionText="Got it!"
                        onActionClick={() => handleLearnMoreClick('Quick Tip Improved')}
                        sx={{ height: '100%' }}
                    />
                </Grid>

                {/* 추가된 RecipeReviewCard 예시 */}
                <Grid size={4}> {/* Assuming 'size' is a valid prop for your Grid setup */}
                    <RecipeReviewCard />
                </Grid>
            </Grid>
        </Container>
    );
};

export default CardPage;