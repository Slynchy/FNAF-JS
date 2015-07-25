@echo off
echo Source: oX Triangle & echo.https://groups.google.com/a/webmproject.org/forum/#!msg/webp-discuss/pakZCY0J6Qw/8mYUac2t6OgJ
pause
pushd %1
for /f "delims=" %%n in ('dir /b /s /a-d-h-s') do IF NOT ".webp" == "%%~xn" (
"%~dp0cwebp.exe" -q 80 -mt -m 6 -sharpness 0 -hint graph "%%n" -o "%%n.webp")
popd
for %%i in (%1\*.*) do IF NOT ".webp" == "%%~xi" del "%%i"
Rename %1\* *. 
Rename %1\* *. 
Rename %1\* *.webp