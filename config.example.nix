{ inputs, ... }:
{
  imports = [ inputs.superstar-checkin.nixosModules.default ];
  services.superstar-checkin = {
    enable = true;
    config = {
      bot = {
        uin = 66600000; # qq机器人的qq号，或者 "disabled" 可以禁用机器人组件。禁用的话，二维码签到也没有入口了
        password = "QQ 机器人密码";
        notifyGroups = [ 114514 ]; # 签到时通知的群组
        qrcodeGroups = [ 114514 ]; # 接收二维码的群组，有些群组不希望用来接收二维码
        ignore = [ 1919810 ]; # 忽略接收二维码群组内某个群成员发送的消息，一般指定同一群的其他机器人
      };
      ignoreCourses = [ 123 ]; # 屏蔽的课程 ID，这些课程的签到和其他活动信息将被忽略
      geoLocations = [
        {
          courseId = 123; # 这门课程的 ID，可以在电脑上打开课程页面，地址栏中将会显示课程 ID, 设置为 "*"" 的项将作为找不到位置信息的课程的默认值
          lon = 114; # 经度
          lat = 514; # 纬度，请务必用 Readme 中的百度地图工具查询
          address = "地图显示的地址"; # 建议去实地发个签到查看学习通上显示的地址
        }
        {
          courseId = 456; # 另一门课的 ID，假装这门课不同天在不同的地方上课
          lon = 114; # 经度
          lat = 514; # 纬度，请务必用 Readme 中的百度地图工具查询
          address = "地图显示的地址"; # 建议去实地发个签到查看学习通上显示的地址
          onlyOnWeekdays = [ 1 ]; # 数字表示的星期，0：周日，1：周一...
        }
        {
          courseId = 456; # 还是刚刚那一门课的 ID，这里写的是不在上一条那些天里面的地理位置
          lon = 1919; # 另外的经度
          lat = 810; # 另外的纬度
          address = "地图显示的地址"; # 更上面的更优先，同一门课程请把没有 onlyOnWeekdays 的写在最下面
        }
      ];
      accounts = [
        {
          username = 18912345678; # 主账号，将用于检测签到
          password = "学习通密码";
        }
        {
          username = 17712345678; # 其他账号，所有账号会一起签到
          password = "学习通密码";
        }
      ];
    };
  };
}
