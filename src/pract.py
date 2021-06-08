#Test.assert_equals create_phone_number([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]), "(123) 456-7890"



arr = [1,2,3,4,5,6,7,8,9,9]

def turn_into_phone(arr):
    phone = ' '.join([str(elem) for elem in arr])
    number = phone.replace(" " ,"")
    phone_number = f"({number[0]}{number[1]}{number[2]}) {number[3]}{number[4]}{number[5]}-{number[6]}{number[7]}{number[8]}{number[9]}"
    print(phone_number)
    return phone_number

turn_into_phone(arr)



def create_phone_number(n):
    print("({}{}{}) {}{}{}-{}{}{}{}".format(*n))
    return "({}{}{}) {}{}{}-{}{}{}{}".format(*n)

create_phone_number(arr)
