import React, { useCallback, useEffect, useState } from "react";

import { Badge } from "@chakra-ui/layout";
import { useRouter } from "next/router";

import BoardBanner from "@/components/board/BoardBanner";
import BoardFAB from "@/components/board/BoardFAB";
import BoardStack from "@/components/board/BoardStack";
import FreeBoardItem from "@/components/board/FreeBoardItem";
import FreeBoardTab from "@/components/board/FreeBoardTabs";
import { AppContainer, Header } from "@/components/common";
import IconSearch from "@/components/icons/IconSearch";

import { AllPosts } from "../free";

function RecruitMain() {
  return (
    <AppContainer>
      <Header back title="채용" rightNode={<IconSearch />} />
      <BoardBanner my={4}>배너 버튼</BoardBanner>
      <FreeBoardTab
        leftLabel="전체"
        rightLabel="모집"
        leftTab={<AllPosts />}
        rightTab={<RecruitPosts />}
      ></FreeBoardTab>
      <BoardFAB />
    </AppContainer>
  );
}

export default RecruitMain;

type SortType = "recent" | "popular";
export const RecruitPosts = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<SortType>("recent");
  const [boardList, setBoardList] = useState<any[]>([]);
  const getBoardList = useCallback((type: SortType) => {
    setLoading(true);
    setTimeout(() => {
      setBoardList([
        {
          id: 1,
          title: `제목 ${type}`,
          description: "본문",
          comments: 24,
          likes: 3,
          date: "2022-12-12",
        },
        {
          id: 2,
          title: `제목 ${type}`,
          description: "본문",
          comments: 24,
          likes: 3,
          date: "2022-12-12",
        },
        {
          id: 3,
          title: `제목 ${type}`,
          description: "본문",
          comments: 24,
          likes: 3,
          date: "2022-12-12",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    getBoardList(sort);
  }, [sort, getBoardList]);

  const handleChangeSort = (type: SortType) => {
    if (loading) return;
    setSort(type);
    getBoardList(type);
  };
  return (
    <div>
      <div>
        <Badge
          bg={sort === "recent" ? "primary.100" : "gray.100"}
          color={sort === "recent" ? "primary.500" : "gray.400"}
          borderColor={sort === "recent" ? "primary.500" : "gray.400"}
          border={sort === "recent" ? "1px solid" : "none"}
          borderRadius={"md"}
          paddingY={"1px"}
          mr={"8px"}
          onClick={() => handleChangeSort("recent")}
        >
          최신순
        </Badge>
        <Badge
          bg={sort === "popular" ? "primary.100" : "gray.100"}
          color={sort === "popular" ? "primary.500" : "gray.400"}
          borderColor={sort === "popular" ? "primary.500" : "gray.400"}
          border={sort === "popular" ? "1px solid" : "none"}
          borderRadius={"md"}
          paddingY={"1px"}
          onClick={() => handleChangeSort("popular")}
        >
          인기순
        </Badge>
      </div>
      {loading ? (
        "loading..."
      ) : (
        <BoardStack>
          {boardList.map(el => (
            <FreeBoardItem
              key={el.id}
              comments={el.comments}
              likes={el.likes}
              date="2022-12-12"
              views={el.views}
              title={el.title}
              leftTag="기업"
              tagType="primary"
              onClick={() => router.push(`/board/${el.id}`)}
            />
          ))}
        </BoardStack>
      )}
    </div>
  );
};
