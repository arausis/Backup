import os
print("here2")

def makescript(url):
   return  '#! /bin/sh \n google-chrome --new-window ' + str(url)

with open("/home/ansel/scripts/sitecomp/sites.txt", "r") as file:
    f = file.readlines()

k = os.popen("ls /home/ansel/scripts/sitescripts").read()
scripts = k.split('\n')[:-1]

names = []
for i in f:
    if len(i) > 1:
        url, name = i.split("|")
        url = url.strip()
        name = name.strip()
        names.append(name)

        if name not in scripts:
            with open("/home/ansel/scripts/sitescripts/"+name, "w") as file:
                file.write(makescript(url))

for s in scripts:
    if s not in names:
        os.system('rm /home/ansel/scripts/sitescripts/' + s)
    
