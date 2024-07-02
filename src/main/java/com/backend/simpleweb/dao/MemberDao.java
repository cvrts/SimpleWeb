package com.backend.simpleweb.dao;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberDao {
	Logger logger = LogManager.getLogger(MemberDao.class);
	
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate = null;
	
	//회원정보 조회, 로그인, 회원정보 조회할 때 비밀번호 체크용
	public List<Map<String, Object>> memberList(Map<String, Object> pMap){
		logger.info("memberList 호출");
		List<Map<String, Object>> mList = sqlSessionTemplate.selectList("memberList", pMap);
		return mList;
	}
	
	//중복검사, 이메일 찾기
	public List<Map<String, Object>> checkInfo(Map<String, Object> pMap){
		logger.info("checkInfo 호출");
		List<Map<String, Object>> mList = sqlSessionTemplate.selectList("checkInfo", pMap);
		return mList;
	}
	
	//세션 정보
	public List<Map<String, Object>> sessionList(Map<String, Object> pMap){
		logger.info("sessionList 호출");
		List<Map<String, Object>> mList = sqlSessionTemplate.selectList("sessionList", pMap);
		return mList;
	}
	
	//이메일 찾기 + 회원정보 구분
	public List<Map<String, Object>> findUser(Map<String, Object> pMap){
		logger.info("findUser 호출");
		List<Map<String, Object>> mList = sqlSessionTemplate.selectList("findUser", pMap);
		return mList;
	}
	
	//추천인 조회
	public List<Map<String, Object>> referrer(Map<String, Object> pMap){
		logger.info("referrer 호출");
		List<Map<String, Object>> mList = sqlSessionTemplate.selectList("referrer", pMap);
		return mList;
	}
	
	//회원가입
	public int memberInsert(Map<String, Object> pMap) {
		logger.info("memberInsert 호출");
		int result = 0;
		result = sqlSessionTemplate.update("memberInsert", pMap);
		return result;
	}
	
	//회원정보 수정
	public int memberUpdate(Map<String, Object> pMap) {
		logger.info("memberUpdate 호출");
		int result = 0;
		result = sqlSessionTemplate.update("memberUpdate", pMap);
		return result;
	}
	
	//회원 탈퇴
	public int resetPassword(Map<String, Object> pMap) {
		logger.info("resetPassword 호출");
		int result = 0;
		result = sqlSessionTemplate.update("resetPassword", pMap);
		return result;
	}
	
	//회원 탈퇴
	public int memberDelete(Map<String, Object> pMap) {
		logger.info("memberDelete 호출");
		int result = 0;
		result = sqlSessionTemplate.update("memberDelete", pMap);
		return result;
	}
}
