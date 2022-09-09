{ pkgs, lib, config, ... }:

let
  cfg = config.services.superstar-checkin;
  configFile = pkgs.writeTextFile {
    name = "config.yml";
    text = pkgs.lib.generators.toYAML { } cfg.config;
  };
in
{
  config = lib.mkIf cfg.enable {
    users = {
      users.superstar-checkin = {
        isSystemUser = true;
        createHome = true;
        home = "/var/lib/superstar-checkin";
        group = "superstar-checkin";
        description = "Superstar automatic checkin service";
      };

      groups.superstar-checkin = {};
    };

    systemd.services.superstar-checkin = {
      description = "Superstar automatic checkin";
      path = [ cfg.package ];
      wantedBy = [ "multi-user.target" ];
      after = [ "network.target" ];
      environment.CONFIG_FILE = configFile;
      environment.DATA_DIR = "/var/lib/superstar-checkin";
      serviceConfig = {
        User = "superstar-checkin";
        Group = "superstar-checkin";
        ExecStart = "${cfg.package}/bin/superstar-checkin";
      };
    };
  };
}
