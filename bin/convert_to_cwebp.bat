pushd %1
for /f "delims=" %%n in ('dir /b /s /a-d-h-s') do IF NOT ".webp" == "%%~xn" (
"%~dp0cwebp.exe" -q 80 -mt -m 6 -sharpness 0 -hint graph "%%n" -o "%%n.webp")
popd
for %%i in (%1\*.*) do IF NOT ".webp" == "%%~xi" del "%%i"
Rename %1\* *. 
Rename %1\* *. 
Rename %1\* *.webp
