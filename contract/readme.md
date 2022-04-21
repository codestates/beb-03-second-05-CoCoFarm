ERC-20 토큰인 CoCoToken 설명

Terminal을 열고 ../contract 폴더 위치에서
truffle migrate --reset
을 실행시킵니다.
맨 처음 실행시 실행자(msg.sender)의 지갑 주소로 CoCoToken이 초기에 한번 발행되도록 하드코딩 되어있습니다.
초기 변경은 ../contract/contracts/CoCoToken.sol 파일의 아래의 constructor() { ..... } 의 내용을 변경하면 됩니다.

contract CoCoToken is Context, InterERC20, OwnerHelper {
constructor() {
\_name = "CoCo Farm Token";
\_symbol = "CoCo";
\_decimals = 18;
\_totalSupply = 100000000 \* (10 ^ \_decimals);
\_balances[msg.sender] = \_totalSupply;
}}

ERC-20 CoCoToken에는 다음과 같은 함수가 있습니다.

totalSupply : 해당 스마트 컨트랙트 기반 ERC-20 토큰의 총 발행량 확인
balanceOf : owner가 가지고 있는 토큰의 보유량 확인
transfer : 토큰을 전송
approve: spender 에게 value 만큼의 토큰을 인출할 권리를 부여. 이 함수를 이용할 때는 반드시 Approval 이벤트 함수를 호출해야 함
allowance : owner가 spender에게 양도 설정한 토큰의 양을 확인
transferFrom : spender가 거래 가능하도록 양도 받은 토큰을 전송
owner : owner 주소를 확인
name : 토큰의 이름 확임
symbol : 토근의 심볼 확인
