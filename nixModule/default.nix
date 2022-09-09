{ pkgs, config, ... }:

with pkgs.lib;
{
  imports = [
    ./service.nix
  ];
  options.services.superstar-checkin = {
    enable = mkEnableOption "Enables Superstar Checkin service";
    package = mkOption {
      type = types.package;
      default = import ../default.nix { inherit pkgs; };
    };
    config = mkOption {
      type = types.attrs;
      description = "https://github.com/Clansty/superstar-checkin/blob/main/config.example.yaml";
    };
  };
}