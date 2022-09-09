# This is a minimal `default.nix` by yarn-plugin-nixify. You can customize it
# as needed, it will not be overwritten by the plugin.

{ pkgs ? import <nixpkgs> { } }:

(pkgs.callPackage ./yarn-project.nix { } { src = ./.; }).overrideAttrs (attrs: {
  buildPhase = ''
    runHook preBuild
    yarn build
    runHook postBuild
  '';

  installPhase = attrs.installPhase + ''
    cp /build/*/.pnp* "$out/libexec/$name"
  '';
})
