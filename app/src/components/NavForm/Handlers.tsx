const blurHandler = (e: React.FocusEvent<HTMLInputElement, Element>, callback: React.Dispatch<React.SetStateAction<any>>, callback2: React.Dispatch<React.SetStateAction<any>>) => {
    switch (e.target.name) {
        case 'email':
            callback(true);
            break
        case 'password':
            callback2(true);
            break
    }
}
const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>, callback: React.Dispatch<React.SetStateAction<any>>, callback2: React.Dispatch<React.SetStateAction<any>>) => {
  callback(e.target.value)
    if (e.target.value.length < 8 && e.target.value.length > 15) {
      callback2('Пароль должен быть не меньше 8 символов и не больше 15')
    } else {
      callback2("");
    }
}
const emailHandler = (e: React.ChangeEvent<HTMLInputElement>, callback: React.Dispatch<React.SetStateAction<any>>, callback2: React.Dispatch<React.SetStateAction<any>>) => {
    callback(e.target.value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(e.target.value))) {
     callback2('Некорректный емейл')
    } else {
      callback2("");
    }
}
const nameHandler = (e: React.ChangeEvent<HTMLInputElement>, callback: React.Dispatch<React.SetStateAction<any>>) => {
      callback(e.target.value)
    }

export { blurHandler, passwordHandler, emailHandler, nameHandler };
