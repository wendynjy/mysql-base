FROM gitpod/workspace-mysql

RUN mysql -e "CREATE DATABASE my_db;"
RUN mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root_password';"