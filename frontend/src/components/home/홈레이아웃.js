import React from 'react'
import { BoardList, CurationContent, CurationList, Main, MainCategoryList, MainSection, MarketList, NoneDiv, UserImg } from '../../styles/HomeStyle'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillHeart, AiFillLike, AiOutlineRight } from 'react-icons/ai'
import ImageSlider from './ImageSlider'
import { HomeCategories } from './homeData'
import { useEffect } from 'react'
import { mainListDB } from '../../service/homeLogic'
import { useState } from 'react'
import { BsBookmarkStar, BsBookmarkStarFill, BsFillEyeFill } from 'react-icons/bs'
import { profileImg } from '../board/boardData'
import { FaHeart } from 'react-icons/fa'

const HomeLayout = () => {
    const navigate = useNavigate()
    // 리스트 담을 변수
    const [marketNew, setMarketNew] = useState([{}])
    const [marketHot, setMarketHot] = useState([{}])
    const [boardNew, setBoardNew] = useState([{}])
    const [boardHot, setBoardHot] = useState([{}])

    /* db에서 메인페이지 정보 가져오기 */
    useEffect(() => {
        const mainList = async () => {
            const main = {}
            const res = await mainListDB(main)
            console.log(res.data)
            const temp = JSON.stringify(res.data)
            const jsonDoc = JSON.parse(temp)
            // 조건용 변수
            let m_count = 0;
            let bHot_count = 0;
            let bNew_count = 0;
            let temp_m_count = 0;
            let temp_bHot_count = 0;
            let temp_bNew_count = 0;
            if (jsonDoc.length > 0) {
                m_count = jsonDoc[0].M_COUNT
                bHot_count = jsonDoc[0].BHOT_COUNT
                bNew_count = jsonDoc[0].BNEW_COUNT
                if (m_count > 5) {
                    temp_m_count = 5
                }
                if (bHot_count > 4) {
                    temp_bHot_count = 4
                }
                if (bNew_count > 4) {
                    temp_bNew_count = 4
                }
                console.log(m_count)
                console.log(bHot_count)
                console.log(bNew_count)
                // 마켓 인기, 신규글 담기
                const list1 = []
                const list2 = []
                // 커뮤 인기, 신규글 담기
                const list3 = []
                const list4 = []
                if (m_count > 0) {
                    // 마켓 인기
                    for (let i = 0; i < temp_m_count; i++) {
                        const obj = { 
                            market_no: jsonDoc[i].MARKET_NO,
                            market_category: jsonDoc[i].MARKET_CATEGORY,
                            market_title: jsonDoc[i].MARKET_TITLE,
                            market_date: jsonDoc[i].MARKET_DATE,
                            market_count: jsonDoc[i].MARKET_COUNT,
                            file_url: jsonDoc[i].FILE_URL,
                        }
                        console.log(obj);
                        list1.push(obj)
                    }
                    setMarketHot(list1)
                    // 마켓 신규
                    for (let i = m_count; i < m_count + temp_m_count; i++) {
                        const obj = {
                            market_no: jsonDoc[i].MARKET_NO,
                            market_category: jsonDoc[i].MARKET_CATEGORY,
                            market_title: jsonDoc[i].MARKET_TITLE,
                            market_date: jsonDoc[i].MARKET_DATE,
                            market_count: jsonDoc[i].MARKET_COUNT,
                            file_url: jsonDoc[i].FILE_URL,
                        }
                        console.log(obj);
                        list2.push(obj)
                    }
                    setMarketNew(list2)
                    // 커뮤 인기
                    for (let i = m_count + m_count; i < m_count + m_count + temp_bHot_count; i++) {
                        const obj = {
                            board_no: jsonDoc[i].BOARD_NO,
                            board_category: jsonDoc[i].BOARD_CATEGORY,
                            board_title: jsonDoc[i].BOARD_TITLE,
                            board_hit: jsonDoc[i].BOARD_HIT,
                            board_date: jsonDoc[i].BOARD_DATE,
                            like_count: jsonDoc[i].LIKE_COUNT,
                            comment_count: jsonDoc[i].COMMENT_COUNT,
                        }
                        console.log(obj);
                        list3.push(obj)
                    }
                    setBoardHot(list3)
                    // 커뮤 신규
                    for (let i = m_count + m_count + bHot_count; i < m_count + m_count + bHot_count + temp_bNew_count; i++) {
                        const obj = {
                            board_no: jsonDoc[i].BOARD_NO,
                            board_category: jsonDoc[i].BOARD_CATEGORY,
                            board_title: jsonDoc[i].BOARD_TITLE,
                            board_hit: jsonDoc[i].BOARD_HIT,
                            board_date: jsonDoc[i].BOARD_DATE,
                            comment_count: jsonDoc[i].COMMENT_COUNT,
                        }
                        console.log(obj);
                        list4.push(obj)
                    }
                    setBoardNew(list4)
                }
            }
        }
        mainList()
    }, [])

    return (
        <>
            <ImageSlider />
            <Main>
                <MainCategoryList>
                    {HomeCategories.map((item) => (
                        <li key={item.category} onClick={() => navigate('/market/' + item.category)}>
                            <img src={item.img} />
                            {item.name}
                        </li>
                    ))}
                </MainCategoryList>

                <MainSection>
                    <header>
                        <h2>지금 뜨는 상품</h2>
                        <Link to="/market/all" className="view-all">
                            전체보기
                            <AiOutlineRight />
                        </Link>
                    </header>
                    <MarketList>
                        {marketHot &&
                            marketHot.map((post) => (
                                <li key={post.market_no} onClick={() => navigate('/market/detail/' + post.market_no)}>
                                    <div>
                                        <img src={post.file_url} />
                                    </div>
                                    <strong>{post.market_title}</strong>
                                    <em>{post.market_count > 0 ? post.market_count : 0}개 판매</em>
                                </li>
                            ))}
                    </MarketList>
                </MainSection>

                <MainSection>
                    <header>
                        <h2>새로 나온 상품</h2>
                        <Link to="/market/all" className="view-all">
                            전체보기
                            <AiOutlineRight />
                        </Link>
                    </header>
                    <MarketList>
                        {marketNew &&
                            marketNew.map((post) => (
                                <li key={post.market_no} onClick={() => navigate('/market/detail/' + post.market_no)}>
                                    <div>
                                        <img src={post.file_url} />
                                    </div>
                                    <strong>{post.market_title}</strong>
                                    <em>
                                        {new Date(post.market_date).toLocaleDateString('ko-KR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </em>
                                </li>
                            ))}
                    </MarketList>
                </MainSection>

                <MainSection>
                    <header>
                        <h2>커뮤니티 인기글</h2>
                        <Link to="/board/all?page=1" className="view-all">
                            전체보기
                            <AiOutlineRight />
                        </Link>
                    </header>
                    <BoardList>
                        {boardHot.length > 0 ?
                            boardHot.map((post) => (
                                <li key={post.board_no} onClick={() => navigate('/board/detail/' + post.board_no)}>
                                    <div className='categoryP'>{post.board_category}</div>
                                    <div className='user'>
                                        <UserImg>
                                            <img className='userImg' src={profileImg[Math.floor(((new Date(post.board_date).getSeconds()) % 10))]} alt="" />
                                        </UserImg>
                                        <p className='titleP'>
                                            {post.like_count >= 5 ? (post.like_count >= 10 ? (
                                                <BsBookmarkStarFill className='star-icon' color={'#4996F3'} />
                                            ) : (
                                                <BsBookmarkStar className='star-icon' color={'#4996F3'} />
                                            )) : null}
                                            {post.board_title}
                                        </p>
                                    </div>
                                    <p className='icons'>
                                        <BsFillEyeFill className='icon-hit' />
                                        {post.board_hit ? post.board_hit : 0}
                                        <FaHeart className='icon-like' />
                                        {post.like_count ? post.like_count : 0}
                                    </p>
                                    <em>
                                        {new Date(post.board_date).toLocaleDateString('ko-KR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </em>
                                </li>
                            )) : (
                                <NoneDiv>
                                    인기글이 없습니다.
                                </NoneDiv>)}
                    </BoardList>
                </MainSection>

                <MainSection>
                    <header>
                        <h2>새로 올라온 글</h2>
                        <Link to="/board/all?page=1" className="view-all">
                            전체보기
                            <AiOutlineRight />
                        </Link>
                    </header>
                    <BoardList>
                        {boardNew.length > 0 ?
                            boardNew.map((post) => (
                                <li key={post.board_no} onClick={() => navigate('/board/detail/' + post.board_no)}>
                                    <div className='categoryP'>{post.board_category}</div>
                                    <div className='user'>
                                        <UserImg>
                                            <img className='userImg' src={profileImg[Math.floor(((new Date(post.board_date).getSeconds()) % 10))]} alt="" />
                                        </UserImg>
                                        <p className='titleP'>
                                            {post.like_count >= 5 ? (post.like_count >= 10 ? (
                                                <BsBookmarkStarFill className='star-icon' color={'#4996F3'} />
                                            ) : (
                                                <BsBookmarkStar className='star-icon' color={'#4996F3'} />
                                            )) : null}
                                            {post.board_title}
                                        </p>
                                    </div>
                                    <p className='icons'>
                                        <BsFillEyeFill className='icon-hit' />
                                        {post.board_hit ? post.board_hit : 0}
                                        <FaHeart className='icon-like' />
                                        {post.like_count ? post.like_count : 0}
                                    </p>
                                    <em>{new Date(post.board_date).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                    </em>
                                </li>
                            )) : (
                                <NoneDiv>
                                    새로운 글이 없습니다.
                                </NoneDiv>)}
                    </BoardList>
                </MainSection>


            </Main>
        </>
    )
}

export default HomeLayout