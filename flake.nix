{
  description = "Flake that configures Superstar Checkin";

  inputs = { 
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };
  outputs = { self, nixpkgs }:
    {
      packages = nixpkgs.lib.mapAttrs
        (system: pkgs: {
          default = import ./default.nix { inherit pkgs; };
        })
        nixpkgs.legacyPackages;
        nixosModules.default = import ./nixModule;
    };
}
