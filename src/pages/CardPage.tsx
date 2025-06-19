// src/pages/CardPage.tsx

import React from 'react';
import { Box, Button, Typography, Container, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DsCard, Bull } from '../components/surface/DsCard'; // DsCard 컴포넌트 경로를 확인해주세요.

const CardPage = () => {
    const handleLearnMoreClick = (cardTitle: string) => {
        alert(`"${cardTitle}" 카드에서 "Learn More" 버튼 클릭됨!`);
    };

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
                DsCard 컴포넌트 데모 페이지
            </Typography>

            <Grid container spacing={4}>
                {/* 예시 1: 기본 구조화된 props 사용 (MUI 예제 기반) */}
                {/* 예시 1: 기본 구조화된 props 사용 (MUI 예제 기반) */}
                <Grid size={4}>
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
                        sx={{ height: '100%' }} // 카드의 높이를 동일하게 맞추기 위한 예시
                    />
                </Grid>

                {/* 예시 2: 다른 내용과 elevation variant 사용 */}
                <Grid size={4}>
                    <DsCard
                        variant="elevation" // elevation variant 사용
                        elevation={6} // elevation 값 지정
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
                        // actionText를 제공하지 않으면 버튼이 렌더링되지 않음
                    />
                </Grid>

                {/* 예시 4: children을 사용하여 커스텀 내부 컨텐츠 구성 */}
                <Grid size={4}>
                    <DsCard variant="outlined" sx={{ height: '100%' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://via.placeholder.com/300x140.png?text=Custom+Image" // 예시 이미지 URL
                            alt="Custom image for card"
                        />
                        <Box sx={{ p: 2 }}> {/* CardContent 대신 Box와 Typography 직접 사용 */}
                            <Typography gutterBottom variant="h5" component="div">
                                Custom Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                This card uses children for a completely custom layout,
                                including a CardMedia and custom Typography arrangement.
                                Lizards are a widespread group of squamate reptiles.
                            </Typography>
                        </Box>
                        <Box sx={{ p: 2, pt: 0 }}> {/* CardActions 대신 Box와 Button 직접 사용 */}
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
                        {/* 구조화된 props(overline, actionText)와 children을 함께 사용할 수도 있습니다. */}
                        {/* 이 경우, children은 CardContent와 CardActions *다음에* 렌더링됩니다. */}
                        {/* DsCard 구현에 따라 children이 렌더링되는 위치가 달라질 수 있으므로 주의해야 합니다. */}
                        {/* 현재 DsCard 구현은 구조화된 props가 있으면 children을 무시합니다. */}
                        {/* 따라서 이 예제에서는 children 대신 content prop을 사용하는 것이 더 명확합니다. */}
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
                <Grid size={4}>  {/* item prop 제거 */}
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
            </Grid>
        </Container>
    );
};

export default CardPage;